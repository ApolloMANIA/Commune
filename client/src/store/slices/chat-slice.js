const DM_STORAGE_KEY = 'commune_direct_messages'

const loadDirectMessages = (userId) => {
  if (!userId || typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(`${DM_STORAGE_KEY}_${userId}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveDirectMessages = (userId, contacts) => {
  if (!userId || typeof window === 'undefined') return
  try {
    localStorage.setItem(`${DM_STORAGE_KEY}_${userId}`, JSON.stringify(contacts))
  } catch {
    // ignore quota / private mode
  }
}

const normalizeContact = (contact) => {
  if (!contact) return null
  const id = contact._id || contact.id
  if (!id) return null
  return {
    _id: id,
    email: contact.email,
    firstname: contact.firstname,
    lastname: contact.lastname,
    image: contact.image,
    color: contact.color,
  }
}

export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessages: [],
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  loadDirectMessages: (userId) => {
    set({ directMessages: loadDirectMessages(userId) })
  },
  pinDirectMessage: (contact) => {
    const normalized = normalizeContact(contact)
    if (!normalized) return

    const { userInfo, directMessages } = get()
    const userId = userInfo?.id || userInfo?._id
    const next = [
      normalized,
      ...directMessages.filter((c) => c._id !== normalized._id),
    ]
    set({ directMessages: next })
    saveDirectMessages(userId, next)
  },
  closeChat: () =>
    set({
      selectedChatType: undefined,
      selectedChatData: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages
    const selectedChatType = get().selectedChatType
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === 'channel'
              ? message.recipient
              : message.recipient._id || message.recipient,
          sender:
            selectedChatType === 'channel'
              ? message.sender
              : message.sender._id || message.sender,
        },
      ],
    })
  },
})
