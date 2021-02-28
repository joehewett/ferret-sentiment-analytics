import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import FeedbackView from 'src/views/feedback/FeedbackView';
import DashboardView from 'src/views/reports/DashboardView';
import NotFoundView from 'src/views/errors/NotFoundView';
import EventsListView from 'src/views/events/EventsListView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'events', element: <EventsListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'feedback/:id', element: <FeedbackView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/events" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
