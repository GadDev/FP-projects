import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
const { div, button } = hh(h);
const initModel = 0;
const rootNode = document.getElementById('app');

function view(dispatch, model) {
	console.log('view');
	return div([
		div({ className: 'mv2' }, `Count: ${model}`),
		button(
			{
				className: 'pv1 ph2 mr2',
				onclick: () => dispatch(MSGS.ADD),
			},
			'+'
		),
		button(
			{
				className: 'pv1 ph2',
				onclick: () => dispatch(MSGS.SUBTRACT),
			},
			'-'
		),
	]);
}

function update(msg, model) {
	console.log('update');
	switch (msg) {
		case MSGS.ADD:
			return model + 1;
		case MSGS.SUBTRACT:
			return model - 1;
		default:
			return model;
	}
}

const MSGS = {
	ADD: 'ADD',
	SUBTRACT: 'SUBTRACT',
};

//impure code below
function app(initModel, update, view, node) {
	let model = initModel;
	let currentView = view(dispatch, model);
	let rootNode = createElement(currentView);
	node.appendChild(rootNode);

	function dispatch(msg) {
		console.log(model);
		model = update(msg, model);
		console.log(model);
		const updatedView = view(dispatch, model);
		const patches = diff(currentView, updatedView);
		rootNode = patch(rootNode, patches);

		currentView = updatedView;
	}
}

app(initModel, update, view, rootNode);
