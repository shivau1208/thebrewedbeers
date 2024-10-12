import React from 'react';
import './Error.scss';
import { Link, useNavigate } from 'react-router-dom';

export default function Page404() {
  return (
    <div className="section">
      <h1 className="error">404</h1>
      <div className="page">Ooops!!! The page you are looking for is not found</div>
      <Link className="back-home" to={"/home"}>Back to home</Link>
    </div>
  );
}
