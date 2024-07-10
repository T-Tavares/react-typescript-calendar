import ss from './index.module.scss';
import Calendar from '../components/Calendar/Calendar';

export default function Home() {
    return (
        <main className={ss.main}>
            <Calendar />
        </main>
    );
}
