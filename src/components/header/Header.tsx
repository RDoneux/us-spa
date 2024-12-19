import AddEventButton from '../add-event-button/AddEventButton';

export default function Header() {
  return (
    <section className="fixed top-0 grid grid-cols-3 left-0 w-full h-[40px] bg-neutral-700 z-50 shadow-black shadow-md">
      <AddEventButton />
    </section>
  );
}
