import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTemplateDetails } from '../api';
import { MainSpinner } from "../components"

const TemplateDesignPinDetails = () => {
  const { templateID } = useParams();

  const { data, isError, isLoading, refetch } = useQuery(
    ["template", templateID],
    () => getTemplateDetails(templateID)
  );

  if(isLoading) return <MainSpinner />

  return (
    <div>TemplateDesignPinDetails</div>
  )
}

export default TemplateDesignPinDetails