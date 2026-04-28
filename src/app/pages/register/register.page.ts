import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {

  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async cadastrar() {
    const loading = await this.loadingCtrl.create({
      message: 'Cadastrando...'
    });
    await loading.present();

    try {
      await this.authService.register(this.email, this.senha);
      this.router.navigateByUrl('/home');
      this.presentToast('Cadastro realizado com sucesso!', 'success');
    } catch (error: any) {
      this.presentToast('Erro ao cadastrar: ' + error.message, 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }
}
