import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Layout from 'core/components/Layout';
import getDetailListData from './selectors/getDetailListData';

const ShoppingListDetail = () => {
	const { listData } = useSelector(getDetailListData);
	const params = useParams<{ id: 'string' }>();

	const selectedList = useMemo(
		() => listData.find((list: any) => list._id === params.id),
		[listData, params.id]
	);

	return (
		<Layout
			detailListName={selectedList?.listName}
			childView
			path="/list"
		></Layout>
	);
};

export default ShoppingListDetail;
