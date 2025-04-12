import nltk
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx
import sys
import json

def sentence_similarity(sent1, sent2, stopwords=None):
    if stopwords is None:
        stopwords = []

    sent1 = [w.lower() for w in sent1]
    sent2 = [w.lower() for w in sent2]

    all_words = list(set(sent1 + sent2))

    vector1 = [0] * len(all_words)
    vector2 = [0] * len(all_words)

    for w in sent1:
        if w in stopwords:
            continue
        vector1[all_words.index(w)] += 1

    for w in sent2:
        if w in stopwords:
            continue
        vector2[all_words.index(w)] += 1

    return 1 - cosine_distance(vector1, vector2)

def build_similarity_matrix(sentences, stop_words):
    similarity_matrix = np.zeros((len(sentences), len(sentences)))

    for idx1 in range(len(sentences)):
        for idx2 in range(len(sentences)):
            if idx1 == idx2:
                continue
            similarity_matrix[idx1][idx2] = sentence_similarity(sentences[idx1], sentences[idx2], stop_words)

    return similarity_matrix

def summarize_chunk(chunk, stop_words, top_n=2):
    sentence_similarity_matrix = build_similarity_matrix(chunk, stop_words)

    try:
        sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_matrix)
        scores = nx.pagerank(sentence_similarity_graph, max_iter=300, alpha=0.85)  # Reduced max_iter for chunks

        ranked_sentences = sorted(((scores[i], s) for i, s in enumerate(chunk)), reverse=True)
        summary = " ".join([ranked_sentences[i][1] for i in range(min(top_n, len(ranked_sentences)))])
        return summary

    except nx.exception.PowerIterationFailedConvergence:
        return "Chunk too complex to summarize."

def generate_summary(text_data, top_n=5, chunk_size=5):
    nltk.download("stopwords")
    stop_words = stopwords.words('english')

    sentences = text_data.split(". ")
    chunks = [sentences[i:i + chunk_size] for i in range(0, len(sentences), chunk_size)]
    
    full_summary = []

    for chunk in chunks:
        summary = summarize_chunk(chunk, stop_words, top_n)
        full_summary.append(summary)

    return "\n\n".join(full_summary)

# Accept input text from command line
if __name__ == "__main__":
    input_path = sys.argv[1]

    try:
        with open(input_path, 'r', encoding='utf-8') as file:
            text_data = file.read()
    except Exception as e:
        print("Error reading input file:", e)
        sys.exit(1)

    print(generate_summary(text_data, top_n=3, chunk_size=5))
