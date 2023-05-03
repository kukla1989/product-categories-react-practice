/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(categoryFind => (
    categoryFind.id === product.categoryId
  ));
  const user = usersFromServer.find(userF => userF.id === category.ownerId);

  return {
    ...product,
    user,
    category,
  };
});

export const App = () => {
  const [selectedUserId, setCurrentUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([0]);

  const handleUserFilterById = userId => setCurrentUserId(userId);
  const handleResetAllFilters = () => {
    setQuery('');
    setCurrentUserId(0);
    setSelectedCategoriesIds([0]);
  };

  const setSelectedCategory = (categoryId) => {
    if (categoryId === 0) {
      setSelectedCategoriesIds(categories => [0]);

      return;
    }

    if (selectedCategoriesIds[0] === 0) {
      setSelectedCategoriesIds(categoies => []);
    }

    if (!selectedCategoriesIds.includes(categoryId)) {
      setSelectedCategoriesIds(categoriesIds => [...categoriesIds, categoryId]);

      return;
    }

    setSelectedCategoriesIds((categoriesIds) => {
      // const newCategoriesIds = categoriesIds.
      categoriesIds.splice(categoriesIds.indexOf(categoryId));

      return [...categoriesIds];
    });
  };

  const productsFilteredByUser = products.filter((product) => {
    if (selectedUserId === 0) {
      return true;
    }

    return product.user.id === selectedUserId;
  });

  const productsFilteredByQuery = productsFilteredByUser.filter(product => (
    product.name.toLowerCase().includes(query.toLowerCase())
  ));

  const visibleProducts = productsFilteredByQuery.filter(product => (
    selectedCategoriesIds[0] === 0
      ? true
      : selectedCategoriesIds.includes(product.category.id)
  ));

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                onClick={() => handleUserFilterById(0)}
                className={classNames({ 'is-active': selectedUserId === 0 })}
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => handleUserFilterById(1)}
                className={classNames({ 'is-active': selectedUserId === 1 })}
              >
                User 1
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={classNames({ 'is-active': selectedUserId === 2 })}
                onClick={() => handleUserFilterById(2)}
              >
                User 2
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => handleUserFilterById(3)}
                className={classNames({ 'is-active': selectedUserId === 3 })}
              >
                User 3
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {query && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                // className="button is-success mr-6 is-outlined"
                className={classNames('button', 'is-success', 'mr-6', {
                  'is-outlined': (selectedCategoriesIds[0] !== 0),
                })}
                onClick={() => setSelectedCategory(0)}
              >
                All
              </a>

              <a
                data-cy="Category"
                className={classNames('button', 'mr-2', 'my-1', {
                  'is-info': selectedCategoriesIds.includes(1),
                })}
                href="#/"
                onClick={() => setSelectedCategory(1)}
              >
                Grocery
              </a>

              <a
                data-cy="Category"
                className={classNames('button', 'mr-2', 'my-1', {
                  'is-info': selectedCategoriesIds.includes(2),
                })}
                href="#/"
                onClick={() => setSelectedCategory(2)}
              >
                Drinks
              </a>

              <a
                data-cy="Category"
                className={classNames('button', 'mr-2', 'my-1', {
                  'is-info': selectedCategoriesIds.includes(3),
                })}
                href="#/"
                onClick={() => setSelectedCategory(3)}
              >
                Fruits
              </a>
              <a
                data-cy="Category"
                className={classNames('button', 'mr-2', 'my-1', {
                  'is-info': selectedCategoriesIds.includes(4),
                })}
                href="#/"
                onClick={() => setSelectedCategory(4)}
              >
                Electronics
              </a>
              <a
                data-cy="Category"
                className={classNames('button', 'mr-2', 'my-1', {
                  'is-info': selectedCategoriesIds.includes(5),
                })}
                href="#/"
                onClick={() => setSelectedCategory(5)}
              >
                Clothes
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={handleResetAllFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>
        <div className="box table-container">
          {visibleProducts.length === 0
            ? (
              <p data-cy="NoMatchingMessage">
                No results
              </p>
            )
            : (
              <table
                data-cy="ProductTable"
                className="table is-striped is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        ID

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Product

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort-down" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Category

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort-up" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        User

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {
                  visibleProducts.map((product) => {
                    const { id, name } = product;
                    const { icon, title } = product.category;

                    return (
                      <tr data-cy="Product" key={id}>
                        <td className="has-text-weight-bold" data-cy="ProductId">
                          {product.id}
                        </td>

                        <td data-cy="ProductName">{name}</td>
                        <td data-cy="ProductCategory">{`${icon} - ${title}`}</td>

                        <td
                          data-cy="ProductUser"
                          className={product.user.sex === 'm'
                            ? 'has-text-link'
                            : 'has-text-danger'}
                        >
                          {product.user.name}
                        </td>
                      </tr>
                    );
                  })
                  }
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </div>
  );
};
