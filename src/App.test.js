import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

test('button has correct initial color, and updates when clicked', () => {
  render(<App />)

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ 'background-color': 'red' })

  // click button
  fireEvent.click(colorButton)

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ 'background-color': 'blue' })

  // expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent('Change to red')
})

test('initial conditions', () => {
  render(<App />)

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  expect(colorButton).toBeEnabled()

  // check that the checkbox out unchecked
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  expect(checkbox).not.toBeChecked()
})

test('checkbox disables button on first click and enables on second click', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  
  // disable button
  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()
  
  // re-enable button
  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
})

test('disabled button has gray background and reverts to red', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  
  // disable button
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({'background-color': 'gray'})
  
  // re-enable button
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({'background-color': 'red'})
})

test('clicked disabled button has gray background and reverts to blue', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  // change button to blue
  fireEvent.click(colorButton)

  // disable button
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({'background-color': 'gray'})

  // re-enable button
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({'background-color': 'blue'})
})