const [first_name, setfirst_name] = useState('');
const [errFN, setErrFN] = useState('');
const firstNameRef = useRef(null);

const [last_name, setlast_name] = useState('');
const [errLN, setErrLN] = useState('');
const lastNameRef = useRef(null);

const [phone_number, setPhonenumber] = useState('');

const [email, setEmail] = useState('');
const [errEmail, setErrEmail] = useState('');
const emailRef = useRef(null)

const [password, setPassword] = useState('');
const [errPwd, setErrPwd] = useState('');
const pwdRef = useRef(null);

const [conPassword, setConPassword] = useState('');
const [errConPwd, setErrConPwd] = useState(false)
const conPwdRef = useRef(null);

const [message, setMessage] = useState('')
const [error, setError] = useState('')
const [errmsg, setErrMsg] = useState('')
const [isValid, setIsValid] = useState(false)


const navigate = useNavigate()
const handleRegister = async () => {
	try {
		const response = await fetch('http://127.0.0.1:5000/api/v1/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ first_name, last_name, email, phone_number, password }),
		}
		);
		const data = await response.json()
		if (response.ok) {
			setMessage(data.message)
			setError('')
			navigate('/login')
		}
		else {
			setError(data.error)
			setMessage('')
		}
	} catch (error) {
		setError('An error occurred, please do try again')
	}
}

const validate = () => {
	if (!first_name) {
		setErrFN('Missing first name');
	} else if (!last_name) {
		setErrLN('Missing last name');
	} else if (!email) {
		setErrEmail('Missing Email')
	} else if (!password) {
		setErrPwd('Missing password')
	} else if (!conPassword) {
		setErrConPwd('Missing confirm password')
	} else {
		setIsValid(true)
	}
}

const handleEmailChange = (e) => {
	if (emailRef.current.value) {
		setErrEmail('')
	}
	setEmail(e.target.value);
}

const handleFirstName = (e) => {
	if (firstNameRef.current.value) {
		setErrFN('');
	}
	setfirst_name(e.target.value);
}

const handleLastName = (e) => {
	if (lastNameRef.current.value) {
		setErrLN('');
	}
	setlast_name(e.target.value);
}

const handlePassword = (e) => {
	if (pwdRef.current.value) {
		setErrPwd('');
		setErrMsg('')
	}
	setPassword(e.target.value);
}
const handlConPassword = (e) => {
	if (conPwdRef.current.value) {
		setErrConPwd('');
		setErrMsg('')
	}
	setConPassword(e.target.value);
}

const handleSubmit = (e) => {
	e.preventDefault();
	validate();
	if (password !== conPassword) {
		setErrMsg('paswords do not match');
		setPassword("");
		setConPassword("");
		// setMessage('form formitted successfully');
		// setIsSubmitted(true);
		// setTimeout(()=>{
		//   window.location.reload();
		// }, [3000])
	} else if (isValid && password && password === conPassword) {
		handleRegister();
		// setMessage('form formitted successfully');
		reseState();
	}
};

const reseState = () => {
	setfirst_name('');
	setlast_name('');
	setEmail('');
	setPassword('')
	setConPassword('')
	setPhonenumber('')
}