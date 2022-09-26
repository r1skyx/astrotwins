export default function ({ $axios }) {
	$axios.defaults.timeout = 5000;
}
