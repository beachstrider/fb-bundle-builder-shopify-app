import React from 'react'
import { render, act, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import TopTitle from './TopTitle'

const renderComponent = (props) => {
  return render(<TopTitle {...props} />)
}

const defaultProps = {
  title: 'Title test',
  subTitle: 'Subtitle test'
}

describe('TopTitle component test', () => {
  describe('test render components props', () => {
    test('should render title and subtitle', () => {
      renderComponent(defaultProps)

      expect(screen.getByText('Title test')).toBeInTheDocument()
      expect(screen.getByText('Subtitle test')).toBeInTheDocument()
    })

    test('should render extra element', () => {
      const extraElement = 'This is an extra element'
      renderComponent({
        ...defaultProps,
        children: <span>{extraElement}</span>
      })

      expect(screen.getByText('Title test')).toBeInTheDocument()
      expect(screen.getByText('Subtitle test')).toBeInTheDocument()
      expect(screen.getByText(extraElement)).toBeInTheDocument()
    })

    test('should render separator', () => {
      renderComponent({
        ...defaultProps
      })

      expect(screen.getByText('Title test')).toBeInTheDocument()
      expect(screen.getByText('Subtitle test')).toBeInTheDocument()
      expect(screen.getByTestId('separator')).toBeVisible()
      expect(screen.getByTestId('separator')).toBeInTheDocument()
    })

    test('should render without separator', () => {
      renderComponent({
        ...defaultProps,
        showSeparator: false
      })

      expect(screen.getByText('Title test')).toBeInTheDocument()
      expect(screen.getByText('Subtitle test')).toBeInTheDocument()
      expect(screen.queryByTestId('separator')).not.toBeInTheDocument()
    })
  })

  describe('Accesibility test', () => {
    test('should test jest axe', async () => {
      await act(async () => {
        const { container } = renderComponent(defaultProps)

        expect(await axe(container)).toHaveNoViolations()
      })
    })
  })

  describe('regression test', () => {
    test('basic render', () => {
      const { asFragment } = renderComponent(defaultProps)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
