'use client';

import { useParams, useRouter } from 'next/navigation';
import type { RootStackParamList } from '@box-model/rsd-app';

export type RouteProp<ParamList, RouteName extends keyof ParamList> = {
  key?: string;
  name: RouteName;
  params: ParamList[RouteName];
};

type NavigateFn = <RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) => void;

export type NavigationStub = {
  navigate: NavigateFn;
  goBack: () => void;
};

// Map React Navigation routes to Next.js paths.
const resolvePath = (
  routeName: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList]
) => {
  switch (routeName) {
    case 'Home':
      return '/';
    case 'About':
      return '/about';
    case 'Blogs':
      return '/blogs';
    case 'BlogArticle': {
      const slug = (params as RootStackParamList['BlogArticle'] | undefined)
        ?.slug;
      return slug ? `/blog/${slug}` : '/blogs';
    }
    default:
      return '/';
  }
};

export const useNavigation = <T = NavigationStub>() => {
  const router = useRouter();

  const navigate: NavigateFn = (name, params) => {
    router.push(resolvePath(name, params));
  };

  return {
    navigate,
    goBack: () => router.back(),
  } as T;
};

export const useRoute = <T = { params: { slug: string } }>() => {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  return {
    params: {
      slug: slug ?? '',
    },
  } as T;
};
