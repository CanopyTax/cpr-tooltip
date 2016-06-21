import React from 'react';

export default class CprTooltip extends React.Component {
	componentDidMount() {
		if (this.refs.child) {
			ensureEventListeners.call(this);
		}
	}

	componentWillReceiveProps() {
		if (this.refs.child) {
			ensureEventListeners.call(this)
		}
	}

	render() {
		let {children} = this.props;

		children = React.cloneElement(children, {
			ref: `child`
		});

		if (this.tooltipEl && this.refs.child) {
			updateTooltip.call(this);
		}

		if (this.props.disabled) {
			cleanupTooltip.call(this);
		}

		return children;
	}

	componentWillUnmount() {
		cleanupTooltip.call(this);
	}
}

function cleanupTooltip() {
	if (this.timeout) {
		clearTimeout(this.timeout);
		delete this.timeout;
	}

	if (this.tooltipEl) {
		if (this.tooltipEl.parentNode) {
			this.tooltipEl.parentNode.removeChild(this.tooltipEl);
		}

		delete this.tooltipEl;
	}
}

function ensureEventListeners() {
	const el = this.refs.child;

	if (!el.classList.contains('cpr-tooltip-target')) {
		el.addEventListener('mouseover', mousedOver.bind(this))
		el.addEventListener('mouseleave', cleanupTooltip.bind(this))

		el.classList.add('cpr-tooltip-target');
	}
}

function mousedOver() {
	if (!this.timeout && !this.props.disabled) {
		this.timeout = setTimeout(() => {
			this.timeout = null;

			if (!this.tooltipEl) {
				this.tooltipEl = document.createElement('span');
				this.tooltipEl.classList.add('cpr-tooltip-text')
				document.body.appendChild(this.tooltipEl);
			}

			updateTooltip.call(this);
		}, this.props.delayTime || 0)
	}
}

function updateTooltip() {
	const tooltipEl = this.tooltipEl;
	const targetEl = this.refs.child;

	tooltipEl.textContent = this.props.text;

	tooltipEl.style.backgroundColor = '#777';
	tooltipEl.style.fontSize = '12px';
	tooltipEl.style.padding = '4px 8px';
	tooltipEl.style.position = 'absolute';
	tooltipEl.style.color = 'white';
	tooltipEl.style.borderRadius = '2px';
	tooltipEl.style.boxShadow = '0 1px 4px 0 rgba(0, 0, 0, .26)';
	tooltipEl.style.zIndex = '100000';

	const rect = targetEl.getBoundingClientRect();

	const width = tooltipEl.clientWidth;
	const height = tooltipEl.clientHeight;

	let leftPos = rect.left;
	let topPos = document.body.scrollTop + rect.top + rect.height + 4;

	const pixelsOffRightScreen = -1 * (window.innerWidth - leftPos - width);
	if (pixelsOffRightScreen > 0) {
		leftPos -= pixelsOffRightScreen;
	}

	const pixelsBelowScreen = -1 * (window.innerHeight - topPos - height);
	if (pixelsBelowScreen > 0) {
		topPos -= Math.max(0, pixelsBelowScreen + 40);
	}

	tooltipEl.style.left = `${leftPos}px`;
	tooltipEl.style.top = `${topPos}px`;
}
