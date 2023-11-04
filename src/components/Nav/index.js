import { Link } from "react-router-dom"

export const Nav = ({ children, className }) => {
    return (
        <div
            className={`mb-3 ${className}`}
            style={{ borderBottom: 'solid 1px var(--bs-gray-300)' }}
        >
            {children}
        </div>
    )
}

export const NavLink = ({ children, className, to }) => {
    return (
        <Link
            to={to}
            className={className}
            style={{
                textDecoration: 'none',
                color: 'var(--bs-green)',
                fontWeight: '600'
            }}
        >
            {children}
        </Link>
    )
}

export const NavBreadCrumb = () => {
    return (
        <span> / </span>
    )
}