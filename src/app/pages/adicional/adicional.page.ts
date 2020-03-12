import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-adicional',
	templateUrl: './adicional.page.html',
	styleUrls: ['./adicional.page.scss'],
})

export class AdicionalPage implements OnInit {

	@Input() type;
	text;

	constructor(
		private modalController: ModalController
	) {}

	ngOnInit() {
		if(this.type == 1) {
			this.text = `<p>PRAXIBOOK.COM</p>
			Condiciones de uso
			<p>1) Datos de identificación
			Usted está visitando la página web www.praxibook.com propiedad de ARAUZU
			GLOBAL SL (en adelante LA COMPAÑÍA).
			Dirección sede social: Ronda del General Mitre 126 A-2 08021. Barcelona. España.
			Dirección email: info@arauzu.com
			C.I.F.: B67535369</p>
			<p>2) Aceptación del Usuario
			Estas Condiciones de Uso regulan el acceso y utilización de la página web www.
			praxibook.com (en adelante la “Web”) que LA COMPAÑÍA pone a disposición de los
			usuarios de Internet mayores de 14 años. El acceso a la misma implica la aceptación sin reservas de las presentes Condiciones de Uso.
			LA COMPAÑÍA puede ofrecer a través de la página web, servicios que podrán
			encontrarse sometidos a unas condiciones particulares propias sobre las cuales se
			informará al Usuario en cada caso concreto.
		   <p> 3) Acceso a la página web y Contraseñas
			En general no se exige la previa suscripción o registro como Usuario para el acceso
			y uso de la página web, sin perjuicio de que para la utilización de determinados
			servicios o contenidos de la misma se deba realizar dicha suscripción o registro.
			Los datos de los Usuarios obtenidos a través de la suscripción o registro a la
			presente página web, están protegidos mediante contraseñas elegidas por ellos
			mismos. El Usuario se compromete a mantener su contraseña en secreto y a protegerla de usos no autorizados por terceros. El Usuario deberá notificar a LA COMPAÑÍA inmediatamente cualquier uso no consentido de su cuenta o cualquier violación
			de la seguridad relacionada con el servicio de la página web, de la que haya tenido
			conocimiento.</p>
			LA COMPAÑÍA adopta las medidas técnicas y organizativas necesarias para garantizar la protección de los datos de carácter personal y evitar su alteración, pérdida,
			tratamiento y/o acceso no autorizado, habida cuenta del estado de la técnica, la
			naturaleza de los datos almacenados y los riesgos a que están expuestos, todo
			ello, conforme a lo establecido por la legislación española de Protección de Datos
			de Carácter Personal.
			LA COMPAÑÍA no se hace responsable frente a los Usuarios, por la revelación de
			sus datos personales a terceros que no sea debida a causas directamente imputables a LA COMPAÑÍA, ni por el uso que de tales datos hagan terceros ajenos a LA
			COMPAÑÍA.
		   <p> 4) Uso correcto de la página web</p>`;
		} else {
			this.text = "lorem ipsum 2"
		}
	}

	async close() {
		this.modalController.dismiss();
	}
}
