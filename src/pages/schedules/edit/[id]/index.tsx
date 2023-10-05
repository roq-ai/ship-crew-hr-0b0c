import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getScheduleById, updateScheduleById } from 'apiSdk/schedules';
import { scheduleValidationSchema } from 'validationSchema/schedules';
import { ScheduleInterface } from 'interfaces/schedule';
import { ShipInterface } from 'interfaces/ship';
import { getShips } from 'apiSdk/ships';

function ScheduleEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ScheduleInterface>(
    () => (id ? `/schedules/${id}` : null),
    () => getScheduleById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ScheduleInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateScheduleById(id, values);
      mutate(updated);
      resetForm();
      router.push('/schedules');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ScheduleInterface>({
    initialValues: data,
    validationSchema: scheduleValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Schedules',
              link: '/schedules',
            },
            {
              label: 'Update Schedule',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Schedule
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="departure_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Departure Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.departure_date ? new Date(formik.values?.departure_date) : null}
              onChange={(value: Date) => formik.setFieldValue('departure_date', value)}
            />
          </FormControl>
          <FormControl id="arrival_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Arrival Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.arrival_date ? new Date(formik.values?.arrival_date) : null}
              onChange={(value: Date) => formik.setFieldValue('arrival_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.departure_location}
            label={'Departure Location'}
            props={{
              name: 'departure_location',
              placeholder: 'Departure Location',
              value: formik.values?.departure_location,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.arrival_location}
            label={'Arrival Location'}
            props={{
              name: 'arrival_location',
              placeholder: 'Arrival Location',
              value: formik.values?.arrival_location,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ShipInterface>
            formik={formik}
            name={'ship_id'}
            label={'Select Ship'}
            placeholder={'Select Ship'}
            fetcher={getShips}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/schedules')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'schedule',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ScheduleEditPage);
