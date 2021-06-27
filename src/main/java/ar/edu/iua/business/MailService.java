package ar.edu.iua.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private JavaMailSender javaMailSender;

    @Autowired
    public MailService(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    public void enviarCorreo(String destinatario, String titulo, String mensaje){
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(destinatario);
        mail.setFrom("matiasslpknt08@gmail.com");
        mail.setSubject(titulo);
        mail.setText(mensaje);

        javaMailSender.send(mail);
    }
}
