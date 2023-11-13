import React, { Fragment, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'

interface ButtonItem {
  type: 'BUTTON'
  label: string
  handleClick: () => void
}

interface Separator {
  type: 'SEPARATOR'
  label: string
}

interface ComponentItem {
  type: 'COMPONENT'
  label: string
  Component: (props: any) => JSX.Element
  props: {
    [key: string]: any
  }
}

interface DropdownMenuProps {
  items: (ButtonItem | ComponentItem | Separator)[]
  Icon: any
  position: string
}

export function DropdownMenu({ Icon, position, items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useOutsideClick(() => setOpen(false))

  return (
    <div className={`fixed ${position} z-10`}>
      <div className="relative w-9">
        <button
          ref={ref}
          onClick={() => setOpen(!open)}
          className="border-transparent border-solid p-0 rounded-md opacity-50 hover:opacity-90 hover:bg-white"
        >
          <Icon />
        </button>
      </div>

      <ul
        className={`${open ? 'visible' : 'invisible'} absolute right-0 list-none m-0 mt-1 p-0 shadow-md text-s`}
        style={{ background: '-moz-field' }}
      >
        {items.map((item, index) => {
          switch (item.type) {
            case 'BUTTON': {
              const { label, handleClick } = item
              return (
                <li key={label}>
                  <button
                    className="text-left w-full block px-4 py-2 whitespace-nowrap border-none"
                    onClick={handleClick}
                  >
                    {label}
                  </button>
                </li>
              )
            }
            case 'COMPONENT': {
              const { label, Component, props } = item
              return (
                <li key={label}>
                  <Component {...props} />
                </li>
              )
            }
            case 'SEPARATOR': {
              const { label } = item
              return (
                <li key={label}>
                  <hr className="mx-4 opacity-25" />
                </li>
              )
            }
          }
        })}
      </ul>
    </div>
  )
}
