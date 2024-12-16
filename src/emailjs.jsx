import React from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {

    const bookName = "TestingIN jsx"
    const bookId = 'Xuv123'
    const time = " 12th Augest 2023 on 10:00PM "
    const hash = "0xksjhdf12333kjksdqeqkj4kjrn"
    const deadline = "12th sept 2023 , 10:00PM"
    const studentId = "N180491"
    const sendEmail = () => {


        emailjs.send('service_qqxen1v', 'template_x9mfcfq',
            {
                bookName: `${bookName}`,
                studentId: `${studentId}`,
                message: `The Book ${bookName} with Book Id ${bookId} Borrowed successfully having hash of ${hash} on ${time} submit before ${deadline}`,
            },
            'RVorn7tXnujE8ioJt')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <>
            <button type='button' onClick={sendEmail} >Send Email</button>
        </>
    );
};