import AuthorService from '@/services/authorService';
import CategoryService from '@/services/categoryService';
import PublisherService from '@/services/publisherService';
import useAuthorStore from '@/stores/authorStore';
import useCategoryStore from '@/stores/categoryStore';
import usePublisherStore from '@/stores/publisherStore';
import React, { useEffect } from 'react';

interface GetDataProviderProps {
  children: React.ReactNode;
}
const GetDataProvider = ({ children }: GetDataProviderProps) => {
  const { setListAuthors } = useAuthorStore();

  const { setListCategories } = useCategoryStore();

  const { setListPublishers } = usePublisherStore();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await AuthorService.getAuthors();
        if (response && response.statusCode === 200) {
          setListAuthors(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch authors:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getCategories();
        if (response && response.statusCode === 200) {
          setListCategories(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    const fetchPublishers = async () => {
      try {
        const response = await PublisherService.getPublishers();
        if (response && response.statusCode === 200) {
          setListPublishers(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch publishers:', error);
      }
    };

    fetchAuthors();
    fetchCategories();
    fetchPublishers();
  }, [setListAuthors, setListCategories, setListPublishers]);

  return children;
};

export default GetDataProvider;
