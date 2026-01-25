import type { RootStackParamList } from '../navigation';
import { blogPosts } from '../data/blog-posts';

type NavigationStub = {
  navigate: (
    screen: keyof RootStackParamList,
    params?: RootStackParamList[keyof RootStackParamList],
  ) => void;
  goBack: () => void;
  setOptions: (options: Record<string, unknown>) => void;
};

const defaultSlug = blogPosts[0]?.slug ?? 'styling-the-light-dom';

export const useNavigation = <T = NavigationStub>() =>
  ({
    navigate: () => {},
    goBack: () => {},
    setOptions: () => {},
  } as T);

export const useRoute = <T = { params: { slug: string } }>() =>
  ({
    key: 'storybook-route',
    name: 'BlogArticle',
    params: { slug: defaultSlug },
  } as T);
