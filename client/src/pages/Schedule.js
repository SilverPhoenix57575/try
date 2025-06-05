import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Schedule = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    type: 'meeting',
    participants: [],
    location: '',
    notes: '',
    reminder: 0 // Add reminder field to the state
  });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('month'); // month, week, day
  const [searchTerm, setSearchTerm] = useState('');
  const [showTemplates, setShowTemplates] = useState(false); // Add template state
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Client Consultation',
      type: 'meeting',
      duration: 60,
      description: 'Initial client consultation meeting',
    }
    // Add more templates as needed
  ]);

  // Get current date info
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get month info for the selected date
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    fetchEvents();
  }, [selectedDate]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No authentication token found');
        setLoading(false);
        return;
      }
      
      const response = await fetch('/api/schedule', {
        headers: {
          'x-auth-token': token
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the data to match our frontend format
      const formattedEvents = data.map(event => {
        const startDate = new Date(event.startTime);
        const formattedDate = startDate.toISOString().split('T')[0];
        const formattedTime = startDate.toTimeString().substring(0, 5);
        
        // Calculate duration in minutes
        const endDate = new Date(event.endTime);
        const durationMs = endDate - startDate;
        const durationMinutes = Math.round(durationMs / (1000 * 60));
        
        return {
          id: event._id,
          title: event.title,
          description: event.description || '',
          date: formattedDate,
          time: formattedTime,
          duration: durationMinutes,
          type: event.isVirtual ? 'call' : 'meeting', // Default to meeting, could be improved
          participants: event.attendees || [],
          location: event.location || '',
          notes: '',
          meetingLink: event.meetingLink || ''
        };
      });
      
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to mock data for development
      setEvents([
        {
          id: 1,
          title: 'Client Meeting - Johnson Case',
          description: 'Initial consultation regarding IP infringement case',
          date: '2024-02-15',
          time: '10:00',
          duration: 60,
          type: 'meeting',
          participants: ['John Smith', 'Sarah Johnson'],
          location: 'Conference Room A',
          notes: 'Bring patent documentation'
        },
        {
          id: 2,
          title: 'Court Hearing - Williams Estate',
          description: 'Probate court hearing for Williams estate case',
          date: '2024-02-15',
          time: '14:00',
          duration: 120,
          type: 'court',
          participants: ['Judge Reynolds', 'Williams Family'],
          location: 'County Courthouse, Room 302',
          notes: 'Formal attire required'
        },
        {
          id: 3,
          title: 'Document Review - Garcia Case',
          description: 'Review employment records and prepare for deposition',
          date: '2024-02-16',
          time: '09:00',
          duration: 180,
          type: 'task',
          participants: [],
          location: 'Office',
          notes: 'Focus on performance reviews from 2022-2023'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Add this function
  const checkForConflicts = (newEvent) => {
  // Get events on the same day
  const dateStr = newEvent.date;
  const sameDay = events.filter(event => event.date === dateStr && event.id !== newEvent.id);
  
  if (sameDay.length === 0) return [];
  
  // Convert times to minutes for easier comparison
  const convertTimeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  const newEventStart = convertTimeToMinutes(newEvent.time);
  const newEventEnd = newEventStart + newEvent.duration;
  
  // Check for overlaps
  return sameDay.filter(event => {
    const eventStart = convertTimeToMinutes(event.time);
    const eventEnd = eventStart + event.duration;
    
    // Check if events overlap
    return (newEventStart < eventEnd && newEventEnd > eventStart);
  });
};

// Modify handleAddEvent to include conflict detection and API call
const handleAddEvent = async () => {
  // Validate form - only title is required
  if (!newEvent.title) {
    alert('Please enter an event title');
    return;
  }
  
  // Set default values for date and time if not provided
  if (!newEvent.date) {
    const today = new Date();
    newEvent.date = today.toISOString().split('T')[0];
  }
  
  if (!newEvent.time) {
    const now = new Date();
    newEvent.time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }

  // Check for conflicts
  const conflicts = checkForConflicts(newEvent);
  if (conflicts.length > 0) {
    // Show conflict warning
    if (!window.confirm(`This event overlaps with ${conflicts.length} existing event(s):\n\n${conflicts.map(e => `- ${e.time} ${e.title}`).join('\n')}\n\nDo you want to schedule anyway?`)) {
      return;
    }
  }

  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    
    // Convert date and time to ISO format for the API
    const startTime = new Date(`${newEvent.date}T${newEvent.time}`);
    const endTime = new Date(startTime.getTime() + newEvent.duration * 60000);
    
    // Prepare data for API
    const scheduleData = {
      title: newEvent.title,
      description: newEvent.description,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      location: newEvent.location,
      isVirtual: newEvent.type === 'call',
      meetingLink: newEvent.type === 'call' ? newEvent.meetingLink || '' : '',
      attendees: Array.isArray(newEvent.participants) ? 
        newEvent.participants.filter(p => p.trim()) : 
        newEvent.participants.split(',').map(p => p.trim()).filter(p => p)
    };
    
    // Make API call
    const response = await fetch('/api/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(scheduleData)
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const savedEvent = await response.json();
    
    // Format the saved event to match our frontend format
    const formattedEvent = {
      id: savedEvent._id,
      title: savedEvent.title,
      description: savedEvent.description || '',
      date: newEvent.date,
      time: newEvent.time,
      duration: newEvent.duration,
      type: newEvent.type,
      participants: scheduleData.attendees,
      location: savedEvent.location || '',
      notes: newEvent.notes || '',
      meetingLink: savedEvent.meetingLink || ''
    };
    
    // Update local state
    setEvents([...events, formattedEvent]);
    
    // Reset form and close modal
    setShowAddModal(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: 60,
      type: 'meeting',
      participants: [],
      location: '',
      notes: '',
      reminder: 0
    });
    
  } catch (error) {
    console.error('Error adding event:', error);
    alert('Failed to add event. Please try again.');
    
    // For development/demo purposes, still add to local state
    const eventToAdd = {
      ...newEvent,
      id: Date.now() // Use timestamp as temporary ID
    };
    
    setEvents([...events, eventToAdd]);
    setShowAddModal(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: 60,
      type: 'meeting',
      participants: [],
      location: '',
      notes: '',
      reminder: 0
    });
  }
};

  const handleDeleteEvent = async (id) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      // Make API call to delete event
      const response = await fetch(`/api/schedule/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Update local state
      setEvents(events.filter(event => event.id !== id));
      
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
      
      // For development/demo purposes, still update local state
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(year, month, day));
    setView('day');
  };

  const getEventsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };
  
  const exportCalendar = (format) => {
    // Implementation for exporting calendar
    console.log(`Exporting calendar in ${format} format`);
    // In a real implementation, this would generate the file and trigger download
  };

  const handleImportCalendar = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Implementation for importing calendar
      console.log(`Importing calendar from ${file.name}`);
      // In a real implementation, this would parse the file and add events
    }
  };

  const getEventsForSelectedDate = () => {
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCalendar = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const dayEvents = getEventsForDate(day);
      const hasEvents = dayEvents.length > 0;
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 dark:border-gray-700 p-1 ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/70'}`}
          onClick={() => handleDateClick(day)}
        >
          <div className="flex justify-between">
            <span className={`inline-flex items-center justify-center w-6 h-6 text-sm ${isToday ? 'bg-blue-600 text-white rounded-full' : 'text-gray-700 dark:text-gray-300'}`}>
              {day}
            </span>
            {hasEvents && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                {dayEvents.length}
              </span>
            )}
          </div>
          <div className="mt-1 space-y-1 overflow-hidden max-h-16">
            {dayEvents.slice(0, 2).map((event, idx) => (
              <div 
                key={idx} 
                className={`text-xs truncate px-1 py-0.5 rounded ${event.type === 'court' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' : event.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'}`}
              >
                {event.time.substring(0, 5)} {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  const EventCard = ({ event, onDelete }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg shadow-sm mb-4 border-l-4 ${event.type === 'court' ? 'border-l-red-500 bg-red-50 dark:bg-red-900/20' : event.type === 'meeting' ? 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20' : event.type === 'call' ? 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-l-green-500 bg-green-50 dark:bg-green-900/20'}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{event.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            <Edit size={16} />
          </button>
          {onDelete && (
            <button 
              onClick={() => onDelete(event.id)} 
              className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock size={14} className="mr-1" />
          <span>{event.time} ({event.duration} min)</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Calendar size={14} className="mr-1" />
          <span>{event.date}</span>
        </div>
        {event.location && (
          <div className="flex items-center text-gray-600 dark:text-gray-400 col-span-2">
            <span className="mr-1">📍</span>
            <span>{event.location}</span>
          </div>
        )}
        {event.participants.length > 0 && (
          <div className="flex items-center text-gray-600 dark:text-gray-400 col-span-2">
            <Users size={14} className="mr-1" />
            <span>{event.participants.join(', ')}</span>
          </div>
        )}
      </div>
      {event.notes && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded">
          <strong>Notes:</strong> {event.notes}
        </div>
      )}
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Legal Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your schedule, court dates, and client meetings.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrevMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {monthNames[month]} {year}
              </h2>
              <button 
                onClick={handleNextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setView('month')} 
                className={`px-3 py-1 rounded-lg text-sm ${view === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                Month
              </button>
              <button 
                onClick={() => setView('week')} 
                className={`px-3 py-1 rounded-lg text-sm ${view === 'week' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setView('day')} 
                className={`px-3 py-1 rounded-lg text-sm ${view === 'day' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                Day
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => exportCalendar('ical')}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center"
                >
                  <span>Export</span>
                </button>
                <button 
                  onClick={() => document.getElementById('import-calendar').click()}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center"
                >
                  <span>Import</span>
                </button>
                <input 
                  id="import-calendar"
                  type="file" 
                  accept=".ics,.csv"
                  className="hidden" 
                  onChange={handleImportCalendar}
                />
                <Button 
                  onClick={() => setShowAddModal(true)}
                  variant="premium"
                  icon={<Plus size={18} />}
                >
                  Add Event
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          {view === 'month' && (
            <div>
              <div className="grid grid-cols-7 gap-0">
                {dayNames.map((day, index) => (
                  <div key={index} className="py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0">
                {renderCalendar()}
              </div>
            </div>
          )}

          {view === 'day' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedDate.toDateString()}
                </h3>
                <button 
                  onClick={() => setView('month')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Back to Month View
                </button>
              </div>
              <div>
                {getEventsForSelectedDate().length > 0 ? (
                  getEventsForSelectedDate()
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((event, index) => (
                      <EventCard key={index} event={event} onDelete={handleDeleteEvent} />
                    ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Events Scheduled</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">There are no events scheduled for this day.</p>
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus size={16} className="mr-2" />
                      Add New Event
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {view === 'week' && (
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Week View (Coming Soon)
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This feature is under development. Please use Day or Month view for now.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h3>
          {searchTerm ? (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Results</h4>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))
              ) : (
                <div className="text-center py-6">
                  <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">No events found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              {events
                .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
                .slice(0, 5)
                .map((event, index) => (
                  <EventCard key={index} event={event} />
                ))
              }
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Event</h2>
              
              <div className="mb-4">
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  <span>Use Template</span>
                </button>
                
                {showTemplates && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div className="max-h-48 overflow-y-auto">
                      {templates.map(template => (
                        <div 
                          key={template.id}
                          onClick={() => {
                            setNewEvent({
                              ...newEvent,
                              title: template.name,
                              description: template.description,
                              duration: template.duration,
                              type: template.type,
                              notes: template.notes || ''
                            });
                            setShowTemplates(false);
                          }}
                          className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                        >
                          <div className="font-medium text-gray-900 dark:text-white">{template.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{template.type} - {template.duration} min</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  >
                    <option value="meeting">Meeting</option>
                    <option value="court">Court Hearing</option>
                    <option value="call">Call</option>
                    <option value="task">Task</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  rows="3"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({...newEvent, duration: parseInt(e.target.value)})}
                    min="15"
                    step="15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Participants (comma separated)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={Array.isArray(newEvent.participants) ? newEvent.participants.join(', ') : ''}
                  onChange={(e) => setNewEvent({...newEvent, participants: e.target.value.split(',').map(p => p.trim()).filter(p => p)})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent({...newEvent, notes: e.target.value})}
                  rows="2"
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reminder</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newEvent.reminder}
                  onChange={(e) => setNewEvent({...newEvent, reminder: parseInt(e.target.value)})}
                >
                  <option value="0">None</option>
                  <option value="5">5 minutes before</option>
                  <option value="15">15 minutes before</option>
                  <option value="30">30 minutes before</option>
                  <option value="60">1 hour before</option>
                  <option value="1440">1 day before</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <Button
                  onClick={handleAddEvent}
                  variant="premium"
                >
                  Add Event
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Schedule;