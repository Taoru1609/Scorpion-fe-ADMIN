import { FunctionComponent, useEffect, useState } from "react";
import HoaDonView from "./HoaDon.view";
import { FormBuilder, FormGroup, Validators } from "react-reactive-form";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import { useNavigate } from "react-router-dom";

export const HoaDon: FunctionComponent<({
	idDonDat: any,
	idPhongDat: any,
	onClose: (hasChange: boolean) => void
})> = (props) => {

	const { dialogService } = useDialog();
	const [detailData, setdetailData] = useState<any>();
	const [detailDataHt, setdetailDataHt] = useState<any>();
	const [idHinhThuc, setIdHinhThuc] = useState<number | null>(null);
	const [selected, setSelected] = useState(false);




	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			idHinhThuc: [null],
			idPhongDat: [null],
			tienPhong: [null, Validators.required],
			tienDichVu: [null, Validators.required],
			tienDaThanhToan: [null, Validators.required],
			thoiGianVao: [null, Validators.required],
			thoiGianRa: [null, Validators.required],
			tenHinhThucTra: [null, Validators.required],
			tienPhaiTra: [null, Validators.required],
			tongTien: [null, Validators.required]
		})
	);

	const formatNumber = (number: any) => {
		if (number !== undefined) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		return "";
	};
	const closeDialog = (hasChange: boolean = false) => {
		props.onClose(hasChange);
	}

	const getDataHTTT = async () => {

		const rsht = await DonDatApi.getHinhThucThanhToan();

		let dataht = rsht.data

		myForm.patchValue(dataht);

		setdetailDataHt(rsht.data);

	}

	//add hóa đơn
	const handleAddHoaDon = async () => {
		debugger

		if (!selected) {
			dialogService.alert('Vui lòng chọn phương thức thanh toán trước');
			return;
		}
		await DonDatApi.addHoaDon({
			phongDatIdPhongDat: {
				id: props.idPhongDat,
			},

			hinhThucThanhToanIdHinhThuc: {
				id: idHinhThuc,
			},
			tienThanhToan: detailData[0].tongTien

		});


		await dialogService.alert('Thanh toán thành công');




	}

	const chonPhong = (event: number) => {
		debugger;
		if (event) {
			setIdHinhThuc(event);
			setSelected(true);
		}
	}


	const inHoaDon = () => {

		window.open('/public/inhoadon?idHoaDon='+props.idPhongDat,'_blank');
		closeDialog();
		window.location.reload();
	}

	//get Dâta
	const getData = async () => {

		const rs = await DonDatApi.getHoaDon(props.idPhongDat);

		let data = rs.data;

		myForm.patchValue({
			idPhongDat: data.idPhongDat,
			idHinhThuc: data.idHinhThuc,
			tienPhong: data.tienPhong,
			tienDichVu: data.tienDichVu,
			tienDaThanhToan: data.tienDaThanhToan,
			tienPhaiTra: data.tienPhaiTra,
			thoiGianVao: data.thoiGianVao,
			thoiGianRa: data.thoiGianRa,
			tongTien: data.tongTien
		});

		console.log(rs.data)

		setdetailData(rs.data);
	}

	// init page
	useEffect(() => {
		getData();
		getDataHTTT();
	}, []);


	return HoaDonView({ closeDialog, formatNumber, detailDataHt, selected, chonPhong, detailData, handleAddHoaDon,inHoaDon });
};

export default HoaDon;
