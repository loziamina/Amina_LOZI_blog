import { useSession } from '@/web/components/SessionContext'
import Button from '@/web/components/ui/Button'
import Link from '@/web/components/ui/Link'

const MenuItem = ({ children, href, isBlue = false, ...otherProps }) => (
  <li {...otherProps}>
    <Link href={href} className={`text-${isBlue ? 'blue' : 'gray'}-500 hover:underline`} >
      {children}
    </Link>
  </li>
)

const Header = () => {
  const { session, signOut } = useSession()

  return (
    <header className="border-b-2 bg-slate-100">
      <div className="flex md:max-w-3xl mx-auto p-4">
        <div className="text-2xl">
          <Link href="/" className="text-blue-500 hover:underline">
            LOGO
          </Link>
        </div>
        <nav className="ml-auto">
          <ul className="flex h-full gap-4 items-center">
            {session ? (
              <>
                <MenuItem href="/" isBlue>List todos</MenuItem>
                <MenuItem href="/todos/create" isBlue>Create todo</MenuItem>
                <MenuItem href="/categories" isBlue>List categories</MenuItem>
                <li>
                  <Button
                    variant="transparent"
                    size="inherit"
                    onClick={signOut}
                    className="text-blue-500 hover:underline"
                  >
                    Sign Out
                  </Button>
                </li>
              </>
            ) : (
              <>
                <MenuItem href="././sign-up">Sign Up</MenuItem>
                <MenuItem href="././sign-in">Sign In</MenuItem>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
