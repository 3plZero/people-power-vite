
import React from 'react';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, DollarSign, Building, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/pages/Index';

interface EmployeeDetailsProps {
  employee: Employee;
  onBack: () => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee, onBack, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateYearsOfService = (hireDate: string) => {
    const hire = new Date(hireDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - hire.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}, ${months} month${months > 1 ? 's' : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}? This action cannot be undone.`)) {
      onDelete(employee.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-gray-600 mt-1">{employee.position} • {employee.department}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => onEdit(employee)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Edit size={16} />
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </Button>
          </div>
        </div>

        {/* Employee Avatar and Status */}
        <Card className="bg-white shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {employee.firstName} {employee.lastName}
                </h2>
                <div className="flex items-center gap-4 mb-3">
                  <Badge 
                    variant={employee.status === 'active' ? 'default' : 'secondary'}
                    className={`${employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} px-3 py-1`}
                  >
                    {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {calculateYearsOfService(employee.hireDate)} of service
                  </span>
                </div>
                <p className="text-lg text-gray-600">{employee.position}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a 
                    href={`mailto:${employee.email}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {employee.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a 
                    href={`tel:${employee.phone}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {employee.phone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Information */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Job Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium text-gray-900">{employee.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium text-gray-900">{employee.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employment Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Employment Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Hire Date</p>
                  <p className="font-medium text-gray-900">{formatDate(employee.hireDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Years of Service</p>
                  <p className="font-medium text-gray-900">{calculateYearsOfService(employee.hireDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                Compensation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Annual Salary</p>
                  <p className="font-medium text-gray-900 text-2xl">${employee.salary.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Monthly Salary</p>
                  <p className="font-medium text-gray-900">${Math.round(employee.salary / 12).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
