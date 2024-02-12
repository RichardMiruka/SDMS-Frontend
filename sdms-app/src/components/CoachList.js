import React from 'react';

const CoachList = () => {
  const coaches = [
    {
      coach_id: 1,
      name: "Coach Richard",
      specialization: "Football Coach",
      imageUrl: "https://images.unsplash.com/photo-1605509603173-ab689807e860?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      coach_id: 2,
      name: "Coach Kalimbo",
      specialization: "Football Coach",
      imageUrl: "https://images.unsplash.com/photo-1614150011754-cd8b7c8dc0cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fEZvb3RiYWxsJTIwQ29hY2h8ZW58MHx8MHx8fDA%3D"
    },
    {
      coach_id: 3,
      name: "Coach Mwaura",
      specialization: "Football Coach",
      imageUrl: "https://media.istockphoto.com/id/1162804750/photo/headshot-of-a-male-football-coach.webp?b=1&s=170667a&w=0&k=20&c=cEA3yFzV-QyoxX3-M53M-_M2t3ZAWb_aiZti14h-inQ="
    },
    {
      coach_id: 4,
      name: "Coach Mawia",
      specialization: "Soccer Coach",
      imageUrl: "https://media.istockphoto.com/id/1148407859/photo/football-coach-coaching-children-soccer-football-training-session-for-children-young-coach.webp?b=1&s=170667a&w=0&k=20&c=TTLS-DRqLv3ELRievpmiAfoYr1EQyy20WfVG-4jOaec="
    },
    {
      coach_id: 5,
      name: "Coach Mbwana",
      specialization: "Table Tennis Coach",
      imageUrl: "https://media.istockphoto.com/id/1271284931/photo/portrait-of-male-footballer-coaching-mixed-age-players.webp?b=1&s=170667a&w=0&k=20&c=Ieew3H4-Bsq-T4cQMyhS7vrAVHFXAyHVgHmbhuQuIxw="
    },
    {
      coach_id: 6,
      name: "Karita",
      specialization: "Tennis Coach",
      imageUrl: "https://images.unsplash.com/photo-1660463529814-a9f9050f3ebf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFRlbm5pcyUyMENvYWNofGVufDB8fDB8fHww"
    },
    {
      coach_id: 7,
      name: "Coach Sam",
      specialization: "Boxing Coach",
      imageUrl: "https://images.unsplash.com/photo-1529165980561-f19d4acc4f3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Qm94aW5nJTIwJTIwQ29hY2h8ZW58MHx8MHx8fDA%3D"
    },
    {
      coach_id: 8,
      name: "Coach Majimbo",
      specialization: "Karate Coach",
      imageUrl: "https://images.unsplash.com/photo-1582234407297-a1b4e08f4e81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8S2FyYXRlJTIwQ29hY2h8ZW58MHx8MHx8fDA%3D"
    },
    {
      coach_id: 9,
      name: "Coach Titus",
      specialization: "Basketball Coach",
      imageUrl: "https://images.unsplash.com/photo-1528567339718-6ee254d88c4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEJhc2tldGJhbGwlMjBDb2FjaHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      coach_id: 10,
      name: "Coach Kirui",
      specialization: "Athletics Coach",
      imageUrl: "https://images.unsplash.com/photo-1544891237-c9fc273936f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEJhc2tldGJhbGwlMjBDb2FjaHxlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coaches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-20">
        {coaches.map(coach => (
          <div key={coach.coach_id} className="bg-white shadow-md rounded-md overflow-hidden p-4">
            <div className="flex justify-center">
              <img src={coach.imageUrl} alt={coach.name} className="w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-full" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-gray-800">{coach.name}</h3>
              <p className="text-sm text-gray-600">{coach.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachList;