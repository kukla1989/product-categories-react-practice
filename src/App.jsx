/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import classNames from 'classnames';

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
  const [currentUserId, setCurrentUserId] = useState(0);

  const visibleProducts = products.filter((product) => {
    if (currentUserId === 0) {
      return true;
    }

    return product.user.id === currentUserId;
  });

  const handleUserFilterById = userId => setCurrentUserId(userId);

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
                className={classNames({ 'is-active': currentUserId === 0 })}
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => handleUserFilterById(1)}
                className={classNames({ 'is-active': currentUserId === 1 })}
              >
                User 1
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={classNames({ 'is-active': currentUserId === 2 })}
                onClick={() => handleUserFilterById(2)}
              >
                User 2
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => handleUserFilterById(3)}
                className={classNames({ 'is-active': currentUserId === 3 })}
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
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

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
        </div>
      </div>
    </div>
  );
};
