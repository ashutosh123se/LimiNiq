type ChatMessage = { role: string; content: string };

const MAX_STORED_MESSAGES = 12;

export function trimChatMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.slice(-MAX_STORED_MESSAGES);
}

export function extractContactFromMessages(messages: ChatMessage[]) {
  const userLines = messages.filter((m) => m.role === "user").map((m) => m.content.trim());
  const blob = userLines.join("\n");

  const email = blob.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] ?? null;
  const phone =
    blob.match(/(?:\+91[\s-]?)?[6-9]\d{9}/)?.[0]?.replace(/\s/g, "") ??
    blob.match(/\b[6-9]\d{9}\b/)?.[0] ??
    null;

  let name: string | null = null;
  for (let i = 0; i < userLines.length; i++) {
    const line = userLines[i];
    if (email && line.includes(email)) continue;
    if (phone && line.replace(/\s/g, "").includes(phone.replace(/\s/g, ""))) continue;
    if (line.length >= 2 && line.length <= 60 && !line.includes("@") && !/\d{5,}/.test(line)) {
      name = line;
      break;
    }
  }

  const summary = userLines.find((l) => l.length > 12 && !l.includes("@") && !/\d{7,}/.test(l)) ?? null;

  return { name, phone, email, summary };
}

export function hasCompleteContact(contact: {
  name: string | null;
  phone: string | null;
  email: string | null;
}) {
  return Boolean(contact.name && contact.phone && contact.email);
}
