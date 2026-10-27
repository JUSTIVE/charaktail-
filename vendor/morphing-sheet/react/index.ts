/**
 * morphing-sheet/react
 *
 * A region is a sheet surface with a stack inside it. The overlay dialog stack
 * and a persistent sidebar are the same primitive with different modality:
 *
 *   <SheetStackProvider id="dialogs" maxDepth={2}>
 *     <SheetStackProvider id="sidebar" inline modal={false} maxDepth={1}
 *                         placement="left" initialViews={[{ content: <Nav /> }]}>
 *       <App />
 *     </SheetStackProvider>
 *   </SheetStackProvider>
 *
 *   const stack = useSheetStack()                  // the nearest region
 *   const dialogs = useSheetStackActions('dialogs') // some other region
 */
export { SheetStackProvider } from './SheetStackProvider.js'
export type { SheetStackProviderProps } from './SheetStackProvider.js'

export { useSheetStack, useSheetStackActions } from './context.js'
export { SheetInspector } from './SheetInspector.js'
export type { PushOptions, SheetDescriptor, SheetStackActions, SheetStackApi } from './types.js'

export type { ContentPhase, MorphDirection, SheetEdge, SheetPlacement, SheetTier, StackPhase } from '../core/types.js'
export type { SheetSlot, SheetView } from '../core/stack.js'
