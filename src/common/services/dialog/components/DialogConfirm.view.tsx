
export const DialogConfirmView = (props: ({ message: string, onClose: () => void, onOk: () => void })) => {
	return (<div className="success-message message">
		<div className="icon-message">
			<img title="icon" src="/images/confirm-delete.png" />
		</div>
		<div className="content-message">{props.message}</div>
		<div className="message-action">
			<button
				type="button"
				className="btn btn-primary mr-2"
				onClick={() => props.onOk()}
			>
				<i className="isax-close-circle1 mr-2"></i>Đồng ý
			</button>
			<button
				type="button"
				className="btn btn-default"
				onClick={() => props.onClose()}
			>
				<i className="isax-close-circle1 mr-2"></i>Hủy
			</button>
		</div >
	</div>);
}

export default DialogConfirmView;