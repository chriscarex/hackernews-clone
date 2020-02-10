import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  Icon,
  Label
} from 'semantic-ui-react'
import fast from 'fast.js'

const Sidebar = ({
  isSidebarVisible,
  searchValue,
  articles,
  hiddenArticles,
  removeFromHide,
  onInput
}) => (
  <>
    {isSidebarVisible
      && (
      <div
        className="sidebar-wrapper"
        data-cy="sidebar"
      >

        <div
          className="sidebar-input-wrapper"
        >
          <Input
            data-cy="sidebar-input"
            value={searchValue}
            icon="search"
            placeholder="Search..."
            onInput={onInput}
          />
        </div>

        {hiddenArticles.length > 0
          && (
          <>
            <div
              className="sidebar-hidden-title"
            >
              Hidden articles
            </div>

            <div
              className="sidebar-hidden-labels"
            >
              {
                fast.map(hiddenArticles, articleIndex => (
                  <Label
                    key={`label-${articleIndex}`}
                  >
                    <Icon
                      name="remove"
                      data-cy="hidden-article-icon"
                      className="icon-remove"
                      onClick={() => removeFromHide(articleIndex)}
                    /> {articles[articleIndex].title}
                  </Label>
                ))
              }
            </div>
          </>
        )}
      </div>
    )}
  </>
)

Sidebar.propTypes = {
  hiddenArticles: PropTypes.arrayOf(PropTypes.number).isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
  removeFromHide: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
}

export default Sidebar
