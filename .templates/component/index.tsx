import React, { lazy, Suspense } from 'react';

const LazyTemplateName = lazy(() => import('./TemplateName').then(module => ({ default: module.TemplateName })));

const TemplateName = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
	<Suspense fallback={null}>
		<LazyTemplateName {...props} />
	</Suspense>
);

export default TemplateName;
