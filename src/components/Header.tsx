import { AiOutlinePercentage } from 'react-icons/ai'

interface HeaderProps {
  userData: {
    firstName: string
    lastName: string
    progress: number
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

function Header({ userData, handleChange, handleSubmit }: HeaderProps) {
  const { firstName, lastName, progress } = userData

  const verifyBtn = () => {
    if (firstName && lastName && progress > 0) {
      return false
    }

    return true
  }

  return (
    <header className="flex justify-center bg-cyan-500 py-10 shadow-md">
      <form className="flex gap-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          className="p-2 rounded-sm"
          placeholder="First name"
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          className="p-2 rounded-sm"
          placeholder="Last name"
        />
        <div className="relative">
          <input
            type="number"
            name="progress"
            value={progress}
            onChange={handleChange}
            className="pr-10 p-2 rounded-sm text-center"
            placeholder="Progress (Ex: 40)"
          />
          <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <AiOutlinePercentage className="h-5 w-5 text-black" />
          </span>
        </div>
        <button
          type="submit"
          disabled={verifyBtn()}
          className="border border-white text-white px-12 rounded-md hover:cursor-pointer duration-150 hover:enabled:bg-white hover:enabled:text-cyan-500 disabled:cursor-not-allowed disabled:text-gray-500 disabled:border-gray-500"
        >
          SEND
        </button>
      </form>
    </header>
  )
}

export default Header
