import { cn } from '@/lib/utils'
import { Props } from '@/lib/types'
import { useCallback, useMemo, useState } from 'react'

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from '../components/ui/sheet'

type DrawerHookProps = {
  onClose?: () => void
  onOpen?: () => void
}

/**
 * `useDrawer` provides a stateful API as well as a set of Drawer components pre-configured
 * to work together around the same shared state. It's an exploration of a non-standard
 * pattern in React: returning components from hooks. This can lead to cleaner component trees
 * and more intuitive component interactions by abstracting away much of the boilerplate,
 * yielding a more expressive and less verbose component usage.
 *
 * Example Usage:
 *
 * ```typescript
 * function AddContactDrawer() {
 *   const { Drawer, closeDrawer } = useDrawer();
 *
 *   return (
 *     <Drawer>
 *       <Drawer.Trigger>
 *         <Button>Add Contact</Button>
 *       </Drawer.Trigger>
 *       <Drawer.Content forForm>
 *         <Drawer.Header>
 *           <Drawer.Title>Add Contact</Drawer.Title>
 *           <Drawer.Description>Add the details of a new contact</Drawer.Description>
 *         </Drawer.Header>
 *         <ContactForm onSuccess={closeDrawer} />
 *       </Drawer.Content>
 *     </Drawer>
 *   )
 * }
 * ```
 */

export function useDrawer({ onOpen, onClose }: DrawerHookProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const openDrawer = useCallback(() => setIsOpen(true), [])
  const closeDrawer = useCallback(() => setIsOpen(false), [])

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open && onClose) onClose()
    if (open && onOpen) onOpen()
  }

  const api = { isOpen, setIsOpen, handleOpenChange }

  const DrawerTrigger = useMemo(() => {
    function DrawerTrigger({ children }: Props) {
      // Accessing the hook's context via the `.api` property is a non-standard pattern used to bypass
      // traditional React reactivity, allowing the use of the most current state & logic without re-creating the component.
      const { setIsOpen } = DrawerTrigger.api
      return (
        <SheetTrigger asChild>
          <div onClick={() => setIsOpen(true)}>{children}</div>
        </SheetTrigger>
      )
    }

    DrawerTrigger.api = api
    return DrawerTrigger
    // We are intentionally not specifying dependencies here because `api` is a stable object
    // that doesn't need to be watched for changes, avoiding unnecessary re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Drawer = useMemo(() => {
    function Drawer({ children }: Props) {
      const { isOpen, handleOpenChange } = Drawer.api
      return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
          {children}
        </Sheet>
      )
    }

    // The `.api` property on the components is used to bypass traditional React reactivity,
    // providing a way to use the most current state & logic without re-creating the component.
    Drawer.api = api
    Drawer.Trigger = DrawerTrigger
    Drawer.Content = DrawerContentImpl
    Drawer.Header = SheetHeader
    Drawer.Title = SheetTitle
    Drawer.Description = SheetDescription

    return Drawer
    // Similar to the above, we don't specify dependencies here because `api` is stable,
    // ensuring that we avoid unnecessary re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // The redundancy here ensures that the components have the latest version of the API,
  // even if it changes between renders. Assigning within the `useMemo` blocks also
  // prevents TypeScript from complaining about non-existent properties.
  Drawer.api = api
  Drawer.Trigger = DrawerTrigger
  DrawerTrigger.api = api

  return { isOpen, Drawer, closeDrawer, openDrawer }
}

type DrawerContentProps = Props & {
  forForm?: boolean
}

// This component is defined outside of the hook because it's a straightforward, stateless
// rendering component. By keeping it outside, we avoid unnecessary recreations during re-renders,
// which can be beneficial for performance and avoiding unnecessary updates.
function DrawerContentImpl({ children, className, forForm }: DrawerContentProps) {
  return (
    <SheetContent className={cn({ 'flex flex-col gap-8': forForm }, className)}>
      {children}
    </SheetContent>
  )
}
