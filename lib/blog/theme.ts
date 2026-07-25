const TOPIC_GRADIENTS = [
  "linear-gradient(135deg, #3B5BFF, #7B61FF)",
  "linear-gradient(135deg, #00C8A0, #3B5BFF)",
  "linear-gradient(135deg, #7B61FF, #00C8A0)",
  "linear-gradient(135deg, #F59E0B, #EC4899)",
  "linear-gradient(135deg, #EC4899, #7B61FF)",
  "linear-gradient(135deg, #22D3EE, #6C5CE7)",
];

/** Deterministic gradient per topic so cards without a cover image stay visually distinct but stable. */
export function gradientForTopic(topic: string): string {
  let hash = 0;
  for (let i = 0; i < topic.length; i++) {
    hash = (hash * 31 + topic.charCodeAt(i)) >>> 0;
  }
  return TOPIC_GRADIENTS[hash % TOPIC_GRADIENTS.length];
}
