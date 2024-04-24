export const DialogAlertView = (props: ({ message: string, onClose: () => void })) => {
	return (<div className="success-message message">
		<div className="icon-message">
			<img title="icon" src="/images/confirm-alert.png" />
		</div>
		<div className="content-message">{props.message}</div>
		<div className="message-action">
			{/* <button
				type="button"
				class="btn btn-default mr-2"
			>
				<i className="isax-close-circle1 mr-2"></i>{{ cancelText }}
			</button> */}
			<button
				type="button"
				className="btn btn-default"
				onClick={() => props.onClose()}
			>
				<i className="isax-close-circle1 mr-2"></i>Đóng
			</button>
		</div >
	</div>);
}

export default DialogAlertView;