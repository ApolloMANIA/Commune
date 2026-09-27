import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getColor } from '@/lib/utils'
import { useAppstore } from '@/store'
import { HOST } from '@/utils/constants'

const DirectMessagesList = () => {
  const {
    directMessages,
    selectedChatData,
    setSelectedChatType,
    setSelectedChatData,
    setSelectedChatMessages,
  } = useAppstore()

  const openChat = (contact) => {
    setSelectedChatType('contact')
    setSelectedChatData(contact)
    setSelectedChatMessages([])
  }

  if (!directMessages.length) {
    return (
      <p className="px-10 pt-2 text-xs text-neutral-500">
        Message someone to pin them here
      </p>
    )
  }

  return (
    <div className="mt-3 flex max-h-[40vh] flex-col gap-1 overflow-y-auto px-4">
      {directMessages.map((contact) => {
        const isActive = selectedChatData?._id === contact._id
        const displayName =
          contact.firstname && contact.lastname
            ? `${contact.firstname} ${contact.lastname}`
            : contact.email

        return (
          <button
            key={contact._id}
            type="button"
            onClick={() => openChat(contact)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
              isActive
                ? 'bg-[#8417ff]/20'
                : 'hover:bg-[#2a2b33]'
            }`}
          >
            <Avatar className="h-10 w-10 overflow-hidden rounded-full">
              {contact.image ? (
                <AvatarImage
                  src={`${HOST}/${contact.image}`}
                  alt={displayName}
                  className="h-full w-full rounded-full object-cover bg-black"
                />
              ) : (
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm uppercase ${getColor(
                    contact.color
                  )}`}
                >
                  {contact.firstname
                    ? contact.firstname[0]
                    : contact.email?.[0]}
                </div>
              )}
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-neutral-100">{displayName}</p>
              {contact.firstname && (
                <p className="truncate text-xs text-neutral-500">
                  {contact.email}
                </p>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default DirectMessagesList
