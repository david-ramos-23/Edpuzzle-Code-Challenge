import { render } from '@testing-library/react'
import type { PropsWithChildren, ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

export default function renderWithProviders(
  ui: ReactElement,
  includeRouter = true
): void {
  render(ui, {
    wrapper: ({ children }: PropsWithChildren): ReactElement => (
      <>
        {includeRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
      </>
    ),
  })
}
