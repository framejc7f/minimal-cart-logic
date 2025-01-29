import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <div className="bg-white p-6 rounded-lg border">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Your shipping address"
              />
            </div>
            <Button className="w-full bg-black hover:bg-gray-800">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;