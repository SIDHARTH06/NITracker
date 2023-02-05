from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('all-MiniLM-L6-v2')
def search(inputtext,database):
    sentences=inputtext+database
    embeddings = model.encode(sentences, convert_to_tensor=True)
    cosine_scores = util.cos_sim(embeddings, embeddings)
    pairs = []
    for i in range(len(cosine_scores)-1):
        for j in range(i+1, len(cosine_scores)):
            pairs.append({'index': [i, j], 'score': cosine_scores[i][j]})
    pairs = sorted(pairs, key=lambda x: x['score'], reverse=True)
    for pair in pairs:
        i, j = pair['index']
        result={}
        if sentences[i] in inputtext:
           result['match']=sentences[j]
           result['score']=pair['score']
        return result
