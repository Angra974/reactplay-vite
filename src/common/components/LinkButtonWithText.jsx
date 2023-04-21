import { ReactNode } from 'react'

const LinkButtonWithText = ({
    children,
    classname="body-c2a-btn--primary",
    href="",
    rel="noopener noreferrer",
    target="_blank",
    role="button",
    icon= ReactNode
}) => {


    return (
        <a
              className={`body-c2a-btn  ${classname}`}
              href={href}
              rel={rel}
              target={target}
            role={role}
            >
              {icon}
              <span className="btn-label">{children}</span>
            </a>
    )
}

export default LinkButtonWithText;
