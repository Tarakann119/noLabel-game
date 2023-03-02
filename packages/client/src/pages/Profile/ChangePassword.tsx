import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
type ChangePasswordType={
    oldPassword:string,
    newPassword:string,
    confirmPassword:string
}
const PasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(2, 'Too Short!')
        .max(10, 'Too Long!')
        .matches(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,40}/g, 'Поле зполнено некорректно')
        .required('Required'),
    oldPassword: Yup.string()
        .min(2, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Required'),
    confirmPassword: Yup.string()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .oneOf([Yup.ref('newPassword'), null], "Пароли не совпадают!")
        .required('Required'),
});

const ChangePassword = () =>{
    const navigate = useNavigate()
    const handleSubmit = async (values: ChangePasswordType) => {
        const data = JSON.stringify(values)
        axios('https://ya-praktikum.tech/api/v2/user/password', {
            method: "post",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        )
            .then(() => { toast.success('Пользователь создан!'); navigate('/profile') })
            .catch(() => { toast.error('Что-то не так...') })
    }
    return(
        <>
    <h2>Смена пароля</h2>

                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    }}
                    validationSchema={PasswordSchema}
                    onSubmit={values => {
                        console.log(values);
                        handleSubmit(values)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field name="oldPassword" />
                            {errors.oldPassword && touched.oldPassword ? (
                                <div>{errors.oldPassword}</div>
                            ) : null}
                            <Field name="newPassword" />
                            {errors.newPassword && touched.newPassword ? (
                                <div>{errors.newPassword}</div>
                            ) : null}
                            <Field name="confirmPassword" />
                            {errors.confirmPassword&& touched.confirmPassword ? (
                                <div>{errors.confirmPassword}</div>
                            ) : null}
                            <button type="submit">Сменить пароль</button>
                            </Form>
                    )}
                </Formik>
    </>
    )
}
export default ChangePassword 