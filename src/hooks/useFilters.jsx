import { useQuery } from "react-query";

const useFilters = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        "globalFilter",
        () => ({searchTerm : ""}), //using a function to return initial data
        { refetchOnWindowsFocus: false }
    );

    return { data, isLoading, isError, refetch }
}

export default useFilters;