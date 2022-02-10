import React from 'react'
import PropTypes from 'prop-types'
import styles from './TopTitle.module.scss'

const TopTitle = ({
  title,
  subTitle,
  showSeparator = true,
  className,
  children
}) => {
  return (
    <div className={`${styles.top} ${className}`}>
      <h2 className={`${styles.topTitle}`}>{title}</h2>
      <p className={`${styles.topSubtitle}`}>{subTitle}</p>
      {children && <p className={`${styles.topExtra}`}>{children}</p>}
      {showSeparator && (
        <div data-testid="separator" className={`${styles.topSeparator}`} />
      )}
    </div>
  )
}

TopTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  showSeparator: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default TopTitle
