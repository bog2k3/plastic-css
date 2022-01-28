function psOpenModal(id, options) {
	let node = document.getElementById(id);
	if (!node) {
		throw new Error(`psOpenModal(): Modal element with id "${id}" not found in DOM.`);
	}
	if (!node.classList.contains("ps-modal")) {
		throw new Error(`psOpenModal(): Modal element with id "${id}" doesn't have the 'ps-modal' class.`);
	}
	node.classList.add("ps-modal-visible");
	document.body.classList.add("has-modal");

	let modalResolve, modalReject;
	let modalResult = new Promise((resolve, reject) => {
		modalResolve = resolve;
		modalReject = reject;
	});

	let modalInstance = {
		element: node,
		result: modalResult,
		close: (value) => {
			psCloseModal(modalInstance);
			modalResolve(value);
		}
	};
	psPositionModal(modalInstance);

	let closeButton = (node.getElementsByClassName("ps-modal-close-button") || [null])[0];
	if (closeButton) {
		closeButton.addEventListener("click", () => modalInstance.close(null));
	}

	return modalInstance;
}

function psCloseModal(modalInstance) {
	modalInstance.element.classList.remove("ps-modal-visible");
	document.body.classList.remove("has-modal");
}

function psPositionModal(modalInstance) {
	let modalWidth = modalInstance.element.getClientRects()[0].width;
	let viewportWidth = window.innerWidth;
	modalInstance.element.style.left = `${(viewportWidth - modalWidth)/2}px`;
}
