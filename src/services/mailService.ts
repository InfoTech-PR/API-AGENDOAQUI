import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";

const logo = 'https://agendoaqui.infotech.app.br/logomarca.png';

export const sendNewUserNotification = async (toEmail: string, newUserName: string, newUserEmail: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const approvalUrl = `${process.env.FRONTEND_URL}`;

    const mailOptions = {
        from: '"Agendo Aqui - Infotech" <agendoaqui@infotech-solucoes.com>',
        to: toEmail,
        subject: 'Novo usuário aguardando aprovação',
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background-color:rgb(15, 84, 148); padding: 20px; color: white; text-align: center;">
                        <div style="padding: 20px; text-align: center;">
                            <img src="${logo}" alt="Sistema AgendoAqui" style="max-width: 180px; height: auto;" />
                        </div>
                    </div>
                    <div style="padding: 30px; color: #333;">
                    <p style="font-size: 16px;">Olá,</p>
                    <p style="font-size: 16px;">
                        O usuário <strong>${newUserName}</strong> (<a href="mailto:${newUserEmail}">${newUserEmail}</a>) acabou de se registrar e está aguardando aprovação para acessar o sistema.
                    </p>
                    <p style="margin: 30px 0;">
                        <a href="${approvalUrl}" style="display: inline-block; padding: 12px 24px; background-color: rgb(15, 148, 82); color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Liberar Acessos
                        </a>
                    </p>
                    <p style="font-size: 14px; color: #666;">
                        Você está recebendo este e-mail porque é um administrador do sistema.
                    </p>
                    </div>
                    <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} Infotech - Soluções Técnológicas
                    </div>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

export const sendNewUserNotificationActive = async (toEmail: string, business: string, user: string, password: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const url = `${process.env.FRONTEND_URL}`;

    const mailOptions = {
        from: '"Agendo Aqui - Infotech" <agendoaqui@infotech-solucoes.com>',
        to: toEmail,
        subject: `Você foi cadastrado como cliente da ${business}!!`,
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background-color:rgb(15, 84, 148); padding: 20px; color: white; text-align: center;">
                        <div style="padding: 20px; text-align: center;">
                            <img src="${logo}" alt="Sistema AgendoAqui" style="max-width: 180px; height: auto;" />
                        </div>
                    </div>
                    <div style="padding: 30px; color: #333;">
                    <p style="font-size: 16px;">Olá,</p>
                    <p style="font-size: 16px;">
                        Parabéns você acaba de receber sua aprovação para acessar o sistema!
                    </p>
                    <p>
                        Seus dados de acesso, usuario: <strong>${user}</strong> e senha: <strong>${password}</strong>
                    </p>
                    <p style="margin: 30px 0;">
                        <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: rgb(15, 148, 82); color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Fazer Login
                        </a>
                    </p>
                    <p style="font-size: 14px; color: #666;">
                        Você está recebendo este e-mail porque é um convidado do sistema.
                    </p>
                    </div>
                    <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} Infotech - Soluções Técnológicas
                    </div>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

// export const sendNewUserNotificationInactive = async (toEmail: string, newUserName: string) => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: Number(process.env.SMTP_PORT),
//         secure: false,
//         auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS,
//         },
//     });

//     const mailOptions = {
//         from: '"Grandes Mamiferos Serra do Mar" <no-reply@serradomar.com>',
//         to: toEmail,
//         subject: 'Seu pedido de acesso foi RECUSADO!!',
//         html: `
//             <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
//                 <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
//                     <div style="background-color:rgb(184, 28, 28); padding: 20px; color: white; text-align: center;">
//                         <div style="padding: 20px; text-align: center;">
//                             <img src="${logo}" alt="Sistema Serradomar" style="max-width: 180px; height: auto;" />
//                         </div>
//                     </div>
//                     <div style="padding: 30px; color: #333;">
//                     <p style="font-size: 16px;">Olá,</p>
//                     <p style="font-size: 16px;">
//                         ${newUserName}</strong> você acabou de ter seu pedido de aprovação cancelado para acessar o sistema. Em caso de duvida entre em contato no número +55 41 9117-8082 
//                     </p>
//                     <p style="font-size: 14px; color: #666;">
//                         Você está recebendo este e-mail porque é um convidado do sistema.
//                     </p>
//                     </div>
//                     <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
//                     © ${new Date().getFullYear()} Grandes Mamiferos Serra do Mar
//                     </div>
//                 </div>
//             </div>
//         `,
//     };

//     await transporter.sendMail(mailOptions);
// };

// export const sendResetPasswordNotification = async (toEmail: string, idUser: number) => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: Number(process.env.SMTP_PORT),
//         secure: false,
//         auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS,
//         },
//     });

//     const token = jwt.sign(
//         { userId: idUser },
//         process.env.JWT_SECRET as string,
//         { expiresIn: "30m" }
//     );
//     const url = `${process.env.SITE_URL}/reset-password/${token}`;

//     const mailOptions = {
//         from: '"Grandes Mamiferos Serra do Mar" <no-reply@serradomar.com>',
//         to: toEmail,
//         subject: 'Seu link para criar uma nova senha!!',
//         html: `
//             <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
//                 <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
//                     <div style="background-color:rgb(132, 28, 184); padding: 20px; color: white; text-align: center;">
//                         <div style="padding: 20px; text-align: center;">
//                             <img src="${logo}" alt="Sistema Serradomar" style="max-width: 180px; height: auto;" />
//                         </div>
//                     </div>
//                     <div style="padding: 30px; color: #333;">
//                     <p style="font-size: 16px;">Olá,</p>
//                     <p style="font-size: 16px;">
//                         Acesse seu link para fazer sua nova senha! Este link irá expirar em 30 min!!
//                     </p>
//                     <p style="margin: 30px 0;">
//                         <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: rgb(15, 148, 82); color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
//                         Redefinir Senha
//                     </a>
//                     </p>
//                     <p style="font-size: 14px; color: #666;">
//                         Você está recebendo este e-mail porque é um convidado do sistema.
//                     </p>
//                     </div>
//                     <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
//                     © ${new Date().getFullYear()} Grandes Mamiferos Serra do Mar
//                     </div>
//                 </div>
//             </div>
//         `,
//     };

//     await transporter.sendMail(mailOptions);
// };