import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  form: FormGroup;
  elemento: any;

  constructor(private formBuilder: FormBuilder, public chatService :ChatService) {
    this.crearFormulario();
    this.chatService.cargarMensajes().subscribe( () => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight
      }, 20)
    });
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }

  crearFormulario(){
    this.form = this.formBuilder.group({
      mensaje: ['']
    })
  }

  async enviarMensaje(){
    const mensaje:string = this.form.controls.mensaje.value

    if(mensaje.length === 0){
        return;
    }
   
    try {
      await this.chatService.agregarMensaje(mensaje);
      this.form.reset({
        mensaje: ""
      })
    } catch (error) {
      console.log(error)
    }

  }

}
