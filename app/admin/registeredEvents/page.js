'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/eventCard';
import { Toaster, toast } from 'react-hot-toast';
import { RingLoader } from 'react-spinners';
const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  

  const handleDelete = async (eventId) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/society-events/delete-event`,{eventId});
      setEvents(events.filter((event) => event._id !== eventId));
      toast.success('Event deleted successfully.');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error.response.data.error);
    }
  };
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/society-events/registered-events`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error(error.response.data.error);
    }
  };
  

  const handleUpdate = async (eventToUpdate) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/society-events/update-event`,eventToUpdate);
      toast.success('Event updated successfully.');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-500" >
      <Toaster position="top-center" reverseOrder={false} />
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <RingLoader color={'#FFFFFF'} size={150} loading={loading} />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen" >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" style={{ marginTop: '150px' }}>
            {events.length > 0 && events.map((event) => (
              <EventCard key={event._id} event={event} onUpdate={(e) => handleUpdate(e)} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
