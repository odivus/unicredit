async function updateUserData(formData: object) {
  try {
      const res = await fetch(`/api/user/update`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(res.status.toString());
      }

    } catch (error) {
      console.log('Failed to update user data');
    }
}

export default updateUserData;